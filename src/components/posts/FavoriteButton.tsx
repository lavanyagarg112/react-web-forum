
/**
 * `FavoriteButton` is a React component that allows users to mark or unmark an item (such as a post) as a favorite.
 * It displays a button with dynamic text that changes based on the favorite status of the item.
 *
 * Props:
 * - `id` (number): The unique identifier of the item (e.g., post ID) for which the favorite status is managed.
 * - `onFavoriteChange` (function, optional): A callback function that gets triggered when the favorite status changes.
 *
 * State:
 * - `isFavourite` (boolean): Tracks the current favorite status of the item.
 * - `favtext` (string): Stores the text to be displayed on the button based on the favorite status.
 *
 * Behavior:
 * - On mount, it checks the initial favorite status of the item by making an API call and updates the state accordingly.
 * - The button text updates based on the current favorite status.
 * - When the button is clicked, it toggles the favorite status by making either a POST (to favorite) or DELETE (to unfavorite) request to the API.
 * - Optionally, it triggers the `onFavoriteChange` callback after successfully updating the favorite status, which causes
 * refetch of favourites, to update the favourites page without refresh.
 *
 * Returns:
 * - A button element with the current favorite status text, which toggles the favorite status of the item on click.
 * 
 * @param {number} id - The unique identifier of the post ID for which the favorite status is managed.
 * @param {function} onFavoriteChange - A callback function that gets triggered when the favorite status changes, which causes
 * refetch of favourites, to update the favourites page without refresh.
 *
 * @returns {JSX.Element} A button element that toggles the favorite status of the item on click.
 */

import { useEffect, useState } from 'react'


const FavoriteButton = ({id, onFavoriteChange}: {id: number, onFavoriteChange?: () => void}) => {
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
