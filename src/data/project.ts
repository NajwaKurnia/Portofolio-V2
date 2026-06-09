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

    }
export const typedProject = project as Project;
