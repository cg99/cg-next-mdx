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
import { useRouter } from 'next/router';

function Home({ posts }) {
  const router = useRouter();
  const { category, search } = router.query;

  if (search) {
    posts = posts?.filter(post => post?.content?.includes(search));
  }

  return (
    <Template searchValue={undefined} setSearchValue={undefined}>
      {/* <h1>Latest Posts</h1> */}
      <div className='mx-auto text-center'>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 text-left">
          {category ? posts?.filter(post => post?.frontmatter?.categories?.includes(category)).map((post, idx) =>
            <Post key={idx} post={post} />
          ) : posts?.map((post, idx) => (
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
    const slug = filename.replace('.mdx', "")

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )

    console.log(slug);
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