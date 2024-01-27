import React from 'react'

function Message() {
  return (
    <div className='message owner'>
        <div className="messageInfo">
            <img src="https://media.licdn.com/dms/image/D4D03AQGNTZ13-PaumA/profile-displayphoto-shrink_800_800/0/1682182507582?e=2147483647&v=beta&t=Z6GE8JnaQw0eFCxtV4S6LkdlcI4PMWJIvG8nxvt_apU" alt="" />
            <span>Just now</span>
        </div>
        <div className="messageContent">
            <p>Hello</p>
            <img src="https://media.licdn.com/dms/image/D4D03AQGNTZ13-PaumA/profile-displayphoto-shrink_800_800/0/1682182507582?e=2147483647&v=beta&t=Z6GE8JnaQw0eFCxtV4S6LkdlcI4PMWJIvG8nxvt_apU" alt="" />
        </div>
    </div>
  )
}

export default Message