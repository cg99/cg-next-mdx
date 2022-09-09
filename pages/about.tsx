import React, { useContext } from 'react'
import Template from '../components/Template'
import { ThemeContext } from '../context/theme';

const about = () => {
    const [theme, setTheme] = useContext(ThemeContext);

    console.log(theme);
    return (
        <Template>
            <h3>About</h3>
            <p>
                Codegenes is a site which helps developers and designers to find useful projects. As developers, we strive to learn more everyday in our field. Everything we learn, we share with our community by writing articles for future references.
            </p>

            <p>
                Contact Email: codegenes2@gmail.com
            </p>
        </Template>
    )
}

export default about