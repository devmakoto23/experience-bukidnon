// pages/index.tsx

import fs from 'fs';
import matter from 'gray-matter';
import { useTranslation } from 'react-i18next';
import path from 'path';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// Define the type for the post object
type Post = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
};

// Define the type for the Home component's props
type HomeProps = {
  posts: Post[];
  locale: string;
};

function Home({ posts, locale }: HomeProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white py-12 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('home.title')}</h2>
          <p className="mt-2 text-sm leading-5 italic text-gray-600">
            {t('home.subtitle')}
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            >
              <img src={post.image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <div className="-ml-4 flex items-center gap-x-4">
                  <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <a href={'/' + locale + '/post/' + post.slug}>
                  <span className="absolute inset-0" />
                  {post.title}
                </a>
              </h3>
              <h4>
                {post.excerpt}
              </h4>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

// Use getStaticProps to fetch data
export async function getStaticProps({locale} : {locale: string}) {
    const postsDirectory = path.join(process.cwd(), 'posts', locale); // Change 'en' to the desired language
    const postFiles = fs.readdirSync(postsDirectory);
  
    const posts = postFiles.map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
  
      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title,
        excerpt: data.excerpt,
        image: data.image
      };
    });
  
    
    return {
        props: {
          ...(await serverSideTranslations(locale, [
            'common'
          ])),
          posts,
          locale
          // Will be passed to the page component as props
        },
      }
  }

export default Home;