import { useEffect, useState } from 'react';
import { 
    GridHeader,
    GridImage,
    SmallTextHeader,
    TextHeader,
    TitleHeader
} from './styles';
import  NasaDataNav  from './NasaDataNav';


const NasaDataHeader = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    return (
        <GridImage>
            <GridHeader style={{ opacity: visible ? 1 : 0 }}>
                <TitleHeader>N A S A   I M A G E S</TitleHeader>
                <TextHeader >NASA</TextHeader>
                <SmallTextHeader >PHOTOGRAPHS</SmallTextHeader>
            </GridHeader>
            <NasaDataNav/>
        </GridImage>

    );
};

export default NasaDataHeader;
