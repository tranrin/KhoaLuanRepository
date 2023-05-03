import React from 'react'
import { Button } from 'semantic-ui-react'
import {like} from 'react-icons/bi';

const LikeButton = () => (
  <div>
     <Button
      color='black'
      content='Like'
      icon='heart'
      size='large'
     
    />
         <Button
      color='red'
      content='Liked'
      icon='heart'
      size='large'
    />
  </div>
)

export default LikeButton