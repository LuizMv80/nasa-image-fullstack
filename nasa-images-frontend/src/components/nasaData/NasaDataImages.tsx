import { FC } from 'react';
import { listPostType } from './NasaDataType';
import Card from '../cardImages/Card';
import { ContainerImages } from './styles';


const NasaDataImage : FC<listPostType> = ({post}) => {
    return (
        <ContainerImages>
            {post.map((img) => (
                Card(img)
            ))}
        </ContainerImages>
    );
};

export default NasaDataImage;
