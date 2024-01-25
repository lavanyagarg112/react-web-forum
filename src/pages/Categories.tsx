
/**
 * `Categories` is a React component that allows users to search for posts by tags.
 *
 * Behavior:
 * - Displays a section titled "Search Posts by Tags."
 * - Renders the `TagSearch` component, which enables users to search for posts by selecting tags.
 *
 * @returns {JSX.Element} A component that provides tag-based post search functionality.
 */

import TagSearch from '../components/TagSearch'


const Categories = () => {
  return (
    <section>
      <h1>Search Posts  by Tags</h1>
      <TagSearch />
    </section>
  )
}

export default Categories
