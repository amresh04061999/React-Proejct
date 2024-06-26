
import styles from './CityList.module.css'
import Spinner from './Spinner'
import CityItem from './CityItem';
import Message from './Message'
function CityList({ cities, isLoading }) {
    if (isLoading) return <Spinner />;
    if(!cities.length) return <Message message="Add your first city"/>
    return (

        <ul className={styles.cityList}>
            {cities.map((data) => <CityItem city={data} key={data.id} />)}
        </ul>


    )
}

export default CityList
