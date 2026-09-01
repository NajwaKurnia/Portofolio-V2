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

export async function GET() {
  try {
    await ensureProjectTable();

    const result = await query(
      `SELECT * FROM projects ORDER BY created_at DESC`
    );

    return NextResponse.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error('GET /api/projects failed:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Gagal mengambil data project.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = String(formData.get('title') ?? '');
    const description = String(formData.get('description') ?? '');
    const link = String(formData.get('link') ?? '');
    const category = String(formData.get('category') ?? 'General');
    const size = String(formData.get('size') ?? 'medium');
    const file = formData.get('file') as File | null;

    if (!title || !description) {
      return NextResponse.json(
        {
          success: false,
          message: 'Judul dan deskripsi wajib diisi.',
        },
        { status: 400 }
      );
    }

    if (!file || file.size === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Pilih file gambar dari perangkat Anda.',
        },
        { status: 400 }
      );
    }

    const image = await saveUploadedFile(file);

    await ensureProjectTable();

    const result = await query(
      `
        INSERT INTO projects (title, description, image, link, category, size)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `,
      [title, description, image, link || '#', category, size]
    );

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Project berhasil ditambahkan.',
    });
  } catch (error) {
    console.error('POST /api/projects failed:', error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Gagal menambahkan project.',
      },
      { status: 500 }
    );
  }
}
