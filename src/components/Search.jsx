import React from 'react'

function Search() {
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
        />
      </div>
        <div className="userChat">
          <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GI-td9gs8D5OKZd19mAOqA.png" alt="" />
          <div className="userChatInfo">
            <span>Aleem</span>
          </div>
        </div>
    </div>
  )
}

export default Search