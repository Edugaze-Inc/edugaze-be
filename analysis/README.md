### analysis protocols

URL http://134.209.132.84:4004/

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
