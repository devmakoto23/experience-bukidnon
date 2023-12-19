import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import LanguageSwitcher from '@/components/language-switcher';
import ReactMarkdown from 'react-markdown';

interface MarkdownPost {
    title: string;
    date: string;
    author: string;
}


function BlogPost({ content, data } : {content: string, data: MarkdownPost}) {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
        <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
          <div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
            <img
              className="absolute inset-0 h-full w-full bg-gray-50 object-cover"
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=2560&h=3413&&q=80"
              alt=""
            />
          </div>
        </div>
        <div className="px-6 lg:contents">
          <div className="mx-auto max-w-2xl pb-24 pt-16 sm:pb-32 sm:pt-20 lg:ml-8 lg:mr-0 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
            <p className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{data.title}</h1>
            <p className="mt-6 text-xl leading-8 text-gray-700">
              <ReactMarkdown>{content}</ReactMarkdown>
            </p>
          </div>
        </div>
      </div>
    </div>
  )

}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const languageDirectories = fs.readdirSync(postsDirectory);

  const paths = languageDirectories.flatMap((lang) => {
    const postFiles = fs.readdirSync(path.join(postsDirectory, lang));
    return postFiles.map((post) => {
      const slug = post.replace(/\.md$/, ''); // Remove the ".md" extension
      return { params: { slug }, locale: lang };
    });
  });

  return {
    paths,
    fallback: false, // Set to true or 'blocking' if you want to handle missing pages differently
  };
}

export async function getStaticProps({ params, locale } : {params: {slug: string}, locale: string }) {
  const { slug } = params;
  const postFilePath = path.join(process.cwd(), 'posts', locale, `${slug}.md`);
  const fileContents = fs.readFileSync(postFilePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Convert the date property to a string or timestamp
  const dateString = data.date.toISOString(); // Converts to ISO string
  // Alternatively, you can use a timestamp:
  // const timestamp = data.date.getTime();

  return {
    props: {
      data: {
        ...data,
        date: dateString, // or timestamp
      },
      content,
    },
  };
}

export default BlogPost;