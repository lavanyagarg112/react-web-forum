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
            const response = await fetch(`http://localhost:3000/favorites/check/${postId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
                // Include authentication headers if required
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
            
            const url = `http://localhost:3000/posts/${id}/favorites`;
        const method = isFavourite ? 'DELETE' : 'POST';

        try {
        const response = await fetch(url, {
            method: method,
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            // Include authentication headers if required
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
