import type { GetStaticProps, NextPage } from 'next'
import { useState } from 'react';
import FrontPage from '../components/FrontPage'
import Template from '../components/Template'
import matter from 'gray-matter'
import path from 'path';
import fs from 'fs'
import { sortByDate } from '../utils';
import Link from 'next/link';
import Post from '../components/Post';

function Home({ posts }) {
  const [searchValue, setSearchValue] = useState('');
  // console.log(posts);
  return (
    <Template searchValue={searchValue} setSearchValue={setSearchValue}>
      {/* <h1>Latest Posts</h1> */}
      <div className='container mx-auto text-center'>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 text-left">
          {posts?.map((post, idx) => (
            <Post key={idx} post={post} />
          ))}
        </div>
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
    const slug = filename.replace('.mdx', '').replace('.md', '')

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )

    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
    }
  })

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  }
}


export default Home
