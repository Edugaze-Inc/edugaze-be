### analysis protocols

URL https://api.edugaze.me/analysis/

**event: "join"**

`socket.emit('join', {sid:room})`

where

`sid = meetingId-studentId`

or(instructor)

`sid = meetingId`

**event: "emotion update"**

`socket.emit('emotion update', {msg:input.value,id:room});`

where

`msg=emotion id=meetingId-studentId`
