import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import Select from 'react-select';

import { useEffect } from 'react';

import PostItem from './posts/PostItem';

import classes from "./posts/NewPostForm.module.css"

// type Post = {
//     id: number,
//     title: string
// }

// type TagOption = {
//     label: string;
//     value: number;
//   };

// const TagSearch = () => {
//     const [availableTags, setAvailableTags] = useState<TagOption[]>([]);
//     const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {

//     const fetchTags = async () => {
//         try {
//           const response = await fetch('http://localhost:3000/tags');
//           if (!response.ok) {
//             throw new Error('Failed to fetch tags');
//           }
//           const data = await response.json();
//           const tags = data.map((tag: any) => ({
//             label: tag.name,
//             value: tag.id
//           }));
//           setAvailableTags(tags);
//         } catch (error) {
//           console.error('Error fetching tags:', error);
//         }
//       };
  
//       fetchTags();

//   }, []);

//   const handleSearch = async () => {

//     // Call the backend API with the tag array
//     try {
//       const response = await fetch(`http://localhost:3000/search?tags=${encodeURIComponent(selectedTags.join(','))}`);
//       if (response.ok) {
//         const data = await response.json();
//         setSearchResults(data.posts);
//         console.log(searchResults)
//       } else {
//         throw new Error('Search failed');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//         <CreatableSelect
//             isMulti
//             options={availableTags}
//             onChange={(selectedOptions) => setSelectedTags(selectedOptions as TagOption[])}
//             value={selectedTags}
//         />
//       <button onClick={handleSearch}>Search</button>
//       <div>
//         {searchResults && searchResults.map((post: Post) => (
//           <Link to={`/showpost/${post.id}`}>{post.title}</Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TagSearch;

// Define the types for your state.
type Post = {
    id: number,
    title: string,
    author_name: string,
    description: string,
    tags?: { id: number; name: string }[];
  };
  
  type TagOption = {
    label: string;
    value: number;
  };
  
  const TagSearch = () => {
    const [availableTags, setAvailableTags] = useState<TagOption[]>([]);
    const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
    const [searchResults, setSearchResults] = useState<Post[]>([]); // Initialize as an array of Post
  
    useEffect(() => {
      const fetchTags = async () => {
        try {
          const response = await fetch('http://localhost:3000/tags');
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
  
    const handleSearch = async () => {
      const tagIds = selectedTags.map((tag) => tag.value); // Get the tag IDs from the selectedTags
      try {
        const response = await fetch(
          `http://localhost:3000/search?tags=${encodeURIComponent(tagIds.join(','))}`
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data.map((post: Post) => ({
            id: post.id,
            title: post.title,
            author_name: post.author_name, // Ensure this property is provided
            description: post.description, // Ensure this property is provided
            tags: post.tags // Ensure this property is provided if applicable
          })));
        
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
            <div className={classes.actions} ><button onClick={handleSearch}>Search</button></div>
        </div>
        <div className={classes.searchresult}>
          {searchResults && searchResults.map((post) => ( // Make sure searchResults is always an array
            <PostItem key={post.id} postData={post} />
          ))}
        </div>
      </div>
    );
  };
  
  export default TagSearch;
  
