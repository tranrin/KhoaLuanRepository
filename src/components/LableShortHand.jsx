import React from 'react'
import { Button } from 'semantic-ui-react'

const ButtonExampleLabeledBasicShorthand = () => (
  <div>
    <Button
    basic
      color='red'
      content='Like'
      icon='like'
      label={{ as: 'a', basic: true, color: 'red', pointing: 'left', content: '2,048' }}
    />
    <Button
      basic
      color='blue'
      content='View'
      icon='eye'
      label={{
        as: 'a',
        basic: true,
        color: 'blue',
        pointing: 'left',
        content: '2,048',
      }}
    />
  </div>
)

export default ButtonExampleLabeledBasicShorthand