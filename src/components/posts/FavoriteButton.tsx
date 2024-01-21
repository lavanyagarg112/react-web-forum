import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const FavoriteButton = ({id, onFavoriteChange}: {id: number, onFavoriteChange?: () => void}) => {
    const navigate = useNavigate();
    const [isFavourite, setIsFavourite] = useState<boolean>()

    const [favtext, setfavtext] = useState('')



    const setfav = () => {
        if (isFavourite){
            setfavtext('Remove from Favourites')
        } else {
            setfavtext('Add to Favourites')
        }

    }

    useEffect(() => {

        const checkFavoriteStatus = async (postId: number) => {
            try {
              const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/favorites/check/${postId}`, {
              
                method: 'GET',
                credentials: 'include',
                headers: {
                  'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',

                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.is_favorite)
                setIsFavourite(data.is_favorite)
            } else {
                throw new Error('Failed to check favorite status');
            }
            } catch (error) {
            console.error('Error:', error);
            }
        }

        checkFavoriteStatus(id)
    
    }, [])

    useEffect(() => {
        console.log(isFavourite);
        setfav();
      }, [isFavourite]);


        const handleFavourite = async () => {
            
            const url = `${process.env.REACT_APP_API_URL}/posts/${id}/favorites`;
        const method = isFavourite ? 'DELETE' : 'POST';
        const token = localStorage.getItem('token');

        try {
        const response = await fetch(url, {
            method: method,
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            
            }
            
        });

      if (response.ok) {
        setIsFavourite(!isFavourite);
        if (onFavoriteChange){
            onFavoriteChange()
        }
      } else {
        // handle errors, such as unauthorized or not found
        throw new Error('Failed to update favorite status');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    }

  return (
    <button onClick={handleFavourite}>{favtext}</button>
  )
}

export default FavoriteButton
