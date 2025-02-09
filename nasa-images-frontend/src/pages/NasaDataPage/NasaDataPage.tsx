import { useEffect, useRef, useState } from 'react';
import { NasaDataContainer } from './styles';
import nasaService from '../../services/nasaService';
import { Input, Text } from '../../styles/generalStyles';
import { postType } from '../../components/nasaData/NasaDataType';
import DataNasaHeader from '../../components/nasaData/NasaDataHeader';
import DataNasaImage from '../../components/nasaData/NasaDataImages';


const NasaDataPage = () => {
    const [posts, setPosts] = useState<postType[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    
    //Filtro para las imagenes
    const [filter, setFilter] = useState("");

    //Lista con los datos filtrados
    const dataFilter = posts.filter((post) =>
        post.camera.name.toLowerCase().includes(filter.toLowerCase())
    );

    //Función para filtrar los datos según la cámara
    const changeList = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    //Función para mostra texto de scroll infinito cuando no hay filtro
    const renderLoadingText = () => {
        return loading ? (
            <Text style={{ color: '#e7e7e7' }}>Charging more images...</Text>
        ) : (
            <Text style={{ color: '#e7e7e7' }}>Show more</Text>
        );
    };

    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    //Observador para crear un scroll infinito
    useEffect(() => {
        if (!loaderRef.current || loading) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading) {
                setPage((prevPage) => prevPage + 1);
            }
        }, {
            threshold: 0.1
        });

        observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [loading]);

    //Funcion para aplicar scroll infinito si esque el elemento es observable
    const fetchPosts = async (page: number) => {
        if (loading || filter != '') return;
        setLoading(true);

        try {
            const res = await nasaService(page);
            if (res && res.photos) {
                setPosts((prev) => [...prev, ...res.photos]);
            } else {
                console.warn('No se encontraron fotos en la respuesta.');
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        setLoading(false);
    };

    return (
        <NasaDataContainer>
            <DataNasaHeader />
            <Input
                type='text'
                placeholder='Filter by camera name abbreviation...'
                value={filter}
                onChange={changeList}
                style={{
                    position: 'fixed',
                    zIndex: '1000',
                    width:'40%',
                    bottom: '20px',
                    right: '20px',
                    color: 'white'
                }}
            />
            <DataNasaImage post={dataFilter} />
            <div ref={loaderRef} style={{ textAlign: 'center', padding: 20 }}>
                {filter == '' && renderLoadingText()}
            </div>
        </NasaDataContainer>
    );
};

export default NasaDataPage;
