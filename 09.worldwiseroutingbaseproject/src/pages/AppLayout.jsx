
import SideBar from "../component/SideBar"
import styles from './AppLayout.module.css'
import Map from "../component/Map"
function AppLayout() {
    return (
        <div className={styles.app}>
        <SideBar />
        <Map/>
        </div>
    )
}

export default AppLayout
