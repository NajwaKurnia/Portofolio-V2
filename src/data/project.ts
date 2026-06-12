type ProjectItem = {
  title: string;
  description: string;
  image: string;
  link: string;
  size: string;
};
type Project = Record<string, ProjectItem[]>;
export const project ={
        // 'UI/UX Design': [
        //     {
        //         title: 'UI/UX Project 1',
        //         description: 'Description of UI/UX Project 1',
        //         image: 'gambar',
        //         link: '#',
        //         size: 'large'
        //     },
        //     {
        //         title: 'UI/UX Project 2',
        //         description: 'Description of UI/UX Project 2',
        //         image: 'gambar',
        //         link: '#',
        //         size: 'small'
        //     },  
        // ],
        // 'Web Development': [
        //     {
        //         title: 'Web Dev Project 1',
        //         description: 'Description of Web Dev Project 1',
        //         image: 'gambar',  
        //         link: '#',
        //         size: 'small'
        //     },
        //     {
        //         title: 'Web Dev Project 2', 
        //         description: 'Description of Web Dev Project 2',
        //         image: 'gambar',
        //         link: '#',
        //         size: 'large'
        //     },
        // ],
        // 'Mobile Apps': [
        //     {
        //         title: 'Mobile App Project 1',
        //         description: 'Description of Mobile App Project 1',
        //         image: 'gambar',
        //         link: '#',
        //         size: 'large'
        //     },
        //     {
        //         title: 'Mobile App Project 2',
        //         description: 'Description of Mobile App Project 2',
        //         image: 'gambar',
        //         link: '#',
        //         size: 'small'
        //     },
        // ],
            'Mini Project': [
              {
                title: 'Tic-Tac-Toe',
                description: 'A web-based multiplayer Tic-Tac-Toe game application with real-time communication using WebSocket. Built with Node.js, Socket.IO, Next.js, TypeScript, and Tailwind CSS. Game state is stored in-memory without a permanent database.',
                image: '/tic-tac-toe.png',
                link: 'https://github.com/NajwaKurnia/Tic-Tac-Toe',
                size: 'large'
              }
            ]

    }
export const typedProject = project as Project;
