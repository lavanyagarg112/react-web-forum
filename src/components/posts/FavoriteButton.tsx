import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const FavoriteButton = ({id}: {id: number}) => {
    const navigate = useNavigate();
    const [isFavourite, setIsFavourite] = useState(false)

    const [favtext, setfavtext] = useState('Add to Favourites')

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
        if (!isFavourite){
            setfavtext('Remove from Favourites')
        } else {
            setfavtext('Add to Favourites')
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
