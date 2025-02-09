import { CardContent, CardMedia } from '@mui/material'
import { postType } from '../nasaData/NasaDataType'
import { GridCard } from './styles'
import { SmallText, Title } from '../../styles/generalStyles'
import { convertDate } from '../../utils/helpers'


export default function Card(post: postType) {

  const htmlContent = `The rover ${post.rover.name} took off on ${convertDate(post.rover.launch_date)} and landed on ${convertDate(post.rover.landing_date)}. The photograph was taken with the ${post.camera.full_name} <strong>(${post.camera.name})</strong> camera. The rover is ${post.rover.status}.`

  return (
    <GridCard style={{ opacity: 1 }}>
      <CardMedia
        component='img'
        image={post.img_src}
        alt='profile picture'
        sx={{
          width: 150,
          height: 150,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '1px solid',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.2)'
        }}
      />
      <CardContent>
        <Title>
          {convertDate(post.earth_date)}
        </Title>
        <SmallText 
        style={{ textAlign: 'justify' }}
        variant="body1" dangerouslySetInnerHTML={{ __html: htmlContent }}
        >
        </SmallText>
      </CardContent>
    </GridCard>
  )
}
