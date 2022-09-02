import type { NextPage } from 'next'
import { useState } from 'react';
import FrontPage from '../components/FrontPage'
import Template from '../components/Template'

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Template searchValue={searchValue} setSearchValue={setSearchValue}>

      <FrontPage />

    </Template>
  )
}



export default Home
