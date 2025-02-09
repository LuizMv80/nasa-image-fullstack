import { FC } from 'react'
import { CircularProgress } from '@mui/material'
import { Button } from '../../styles/generalStyles'
import { CustomButtonType } from './CustomButtonType'


export const CustomButton: FC<CustomButtonType> = ({loading, text}) => {
    return (
        <Button
            disabled={loading}
            sx={{ position: 'relative', height: 'max-content' }}
        >
            {loading ? (
                <CircularProgress
                    size={24}
                    sx={{ color: '#fff' }}
                />
            ) : (
               text
            )}
        </Button>
    )
}