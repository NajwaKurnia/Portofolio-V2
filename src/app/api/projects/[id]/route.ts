import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { ensureProjectTable, query } from '@/lib/db';

async function saveUploadedFile(file: File | null) {
  if (!file || file.size === 0) {
    return '';
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/gif'];

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Format gambar tidak valid. Gunakan JPG, PNG, WEBP, atau GIF.');
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(uploadDir, { recursive: true });

  const ext = path.extname(file.name) || '.png';
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
  const filePath = path.join(uploadDir, fileName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return `/uploads/${fileName}`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await ensureProjectTable();

    const result = await query('SELECT * FROM projects WHERE id = $1', [Number(id)]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Project tidak ditemukan.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('GET /api/projects/[id] failed:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Gagal mengambil detail project.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    const title = String(formData.get('title') ?? '');
    const description = String(formData.get('description') ?? '');
    const link = String(formData.get('link') ?? '');
    const category = String(formData.get('category') ?? 'General');
    const size = String(formData.get('size') ?? 'medium');
    const file = formData.get('file') as File | null;
    const existingImage = String(formData.get('image') ?? '');

    if (!title || !description) {
      return NextResponse.json(
        {
          success: false,
          message: 'Judul dan deskripsi wajib diisi.',
        },
        { status: 400 }
      );
    }

    const savedImage = (await saveUploadedFile(file)) || existingImage || '';

    await ensureProjectTable();

    const result = await query(
      `
        UPDATE projects
        SET title = $1,
            description = $2,
            image = $3,
            link = $4,
            category = $5,
            size = $6,
            updated_at = NOW()
        WHERE id = $7
        RETURNING *
      `,
      [title, description, savedImage, link || '#', category, size, Number(id)]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Project tidak ditemukan.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Project berhasil diperbarui.',
    });
  } catch (error) {
    console.error('PUT /api/projects/[id] failed:', error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Gagal memperbarui project.',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await ensureProjectTable();

    const result = await query(
      'DELETE FROM projects WHERE id = $1 RETURNING *',
      [Number(id)]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Project tidak ditemukan.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project berhasil dihapus.',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('DELETE /api/projects/[id] failed:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Gagal menghapus project.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
