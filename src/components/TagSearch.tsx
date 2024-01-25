/**
 * `TagSearch` is a React component that allows users to search for posts based on selected tags.
 *
 * Behavior:
 * - Fetches available tags from the server.
 * - Displays a multi-select input to choose tags for filtering posts.
 * - Allows users to select multiple tags and trigger a search.
 * - Sends a request to the server to retrieve posts that match the selected tags.
 * - Displays the search results as a list of `PostItem` components.
 * - Provides feedback when no posts match the selected tags.
 *
 * @returns {JSX.Element} A component that enables users to search for posts by selecting tags.
 */


import{ useState } from 'react';
import Select from 'react-select';
import { useEffect } from 'react';
import PostItem from './posts/PostItem';
import classes from "./posts/NewPostForm.module.css"
import { useLocation } from 'react-router-dom';
import { PostData } from '../store/PostType';
  
  type TagOption = {
    label: string;
    value: number;
  };
  
  const TagSearch = () => {
    const [availableTags, setAvailableTags] = useState<TagOption[]>([]);
    const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
    const [searchResults, setSearchResults] = useState<PostData[]>([]); // Initialize as an array of Post

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
      }

    const query = useQuery();
    const tagIdFromQuery = query.get('tagId');

    useEffect(() => {
        // If there is a tagId in the query, set it as the selected tag and perform the search
        if (tagIdFromQuery) {
          const tagToSelect = availableTags.find(tag => tag.value.toString() === tagIdFromQuery);
          if (tagToSelect) {
            setSelectedTags([tagToSelect]);
            handleSearch([tagToSelect]);
          }
        }
      }, [availableTags, tagIdFromQuery]);
  
    useEffect(() => {
      const fetchTags = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/tags`);
          if (!response.ok) {
            throw new Error('Failed to fetch tags');
          }
          const data = await response.json();
          const tags = data.map((tag: any) => ({
            label: tag.name,
            value: tag.id,
          }));
          setAvailableTags(tags);
        } catch (error) {
          console.error('Error fetching tags:', error);
        }
      };
  
      fetchTags();
    }, []);
  
    const handleSearch = async (tagsToSearch = selectedTags) => {
      const tagIds = tagsToSearch.map((tag) => tag.value); // Get the tag IDs from the selectedTags
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/search?tags=${encodeURIComponent(tagIds.join(','))}`
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data.map((post: PostData) => ({
            id: post.id,
            title: post.title,
            author_name: post.author_name,
            description: post.description, 
            tags: post.tags,
            username: post.username
          })));
          console.log(searchResults)
        
        } else {
          throw new Error('Search failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div>
        <div className={classes.searchdiv}>
            <Select
              isMulti
              options={availableTags}
              onChange={(selectedOptions) =>
                setSelectedTags(selectedOptions as TagOption[])
              }
              value={selectedTags}
            />
            <div className={classes.actions} ><button onClick={() => handleSearch(selectedTags)}>Search</button></div>
        </div>
        <div className={classes.searchresult}>
          {searchResults && searchResults.map((post) => (
            <PostItem key={post.id} postinfo={post} />
              
          ))}
          {searchResults.length === 0 && <p>No Post Found</p>}
        </div>
      </div>
    );
  };
  
  export default TagSearch;
  
