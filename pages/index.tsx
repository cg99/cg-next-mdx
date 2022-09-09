import fs from 'fs';
import matter from 'gray-matter';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import path from 'path';
import { useState } from 'react';
import Post from '../components/Post';
import Template from '../components/Template';
import { useThemeContext } from '../context/theme';
import { sortByDate } from '../utils';

function Home({ posts }) {
  // const [theme, setTheme] = useThemeContext();

  // console.log(theme);


  const router = useRouter();
  const { category, search } = router.query;

  if (category) {
    posts = posts?.filter(post => post?.frontmatter.categories?.includes(category));
  }

  if (search) {
    posts = posts?.filter(post => post?.content?.includes(search));
  }

  const [totalPosts, setTotalPosts] = useState(6);

  const len = posts.length;

  return (
    <Template>
      {/* <h1>Latest Posts</h1> */}
      <div className='mx-auto text-center'>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 text-left">
          {posts?.slice(0, totalPosts).map((post, idx) => <Post key={idx} post={post} />)}
        </div>
        {totalPosts <= len &&
          <button className='bg-blue-600 rounded-full text-white py-2 px-4 mt-4 shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
            onClick={() => setTotalPosts(totalPosts + 6)}>
            Load More
          </button>
        }

      </div>

    </Template>
  );
}


export const getStaticProps: GetStaticProps = () => {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'))


  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.mdx', "")

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )

    // console.log(slug);
    try {
      const { data: frontmatter, content } = matter(markdownWithMeta);

      // frontmatter?.categories.split(', ').forEach(cat => { categories.push(cat) });

      return {
        slug,
        frontmatter,
        content
      }
    } catch (error) {
      console.log(error);
    }
  })

  // console.log(Array.from(new Set(categories)));

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  }
}


export default Home