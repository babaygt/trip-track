import { useNavigate } from 'react-router-dom'

const SearchResults = ({ results, onResultClick }) => {
	const navigate = useNavigate()

	const handleClick = (userId) => {
		if (onResultClick) {
			onResultClick()
		}
		navigate(`/user/${userId}`)
	}

	return (
		<div className='search-results'>
			{results.map((user) => (
				<div
					key={user._id}
					className='search-result-item'
					onClick={() => handleClick(user._id)}
				>
					<img
						src={user.profilePicture}
						alt={user.username}
						className='search-result-img'
					/>
					<div className='search-result-info'>
						<p className='search-result-name'>{user.name}</p>
						<p className='search-result-username'>@{user.username}</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default SearchResults
