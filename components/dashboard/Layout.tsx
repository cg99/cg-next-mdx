import Sidebar from './Sidebar'
import styles from '../../styles/Dashboard.module.css';

export default function Layout({ children }) {
    return (
        <div className='flex columns-2 h-full'>
            <Sidebar />
            <main className={`m-4 w-full ${styles.main}`}>{children}</main>
        </div>
    )
}