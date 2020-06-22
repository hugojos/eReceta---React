import React from 'react';

import { ReportProblemOutlined } from '@material-ui/icons'
import { TextField, Tooltip, InputAdornment } from '@material-ui/core'

const AppInput = ({handle, name, error, label, value, type, disabled, placeholder}) => {
    return (
        <TextField
        disabled={disabled || false}
        error={!!error}
        InputProps={{
            endAdornment: 
            error &&
            <InputAdornment
            position="end">
                <Tooltip placement="top-end" title={error}>
                    <ReportProblemOutlined className="text-danger"/>
                </Tooltip>
            </InputAdornment>,
        }}
        onChange={handle}
        fullWidth
        name={name}
        placeholder={ placeholder || '' }
        label={label || ''}
        variant="outlined" 
        size="small" 
        value={value}
        type={type || 'text'}/>
    )
}

export default AppInput;