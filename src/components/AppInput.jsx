import React, { useEffect } from 'react';

import { ReportProblemOutlined } from '@material-ui/icons'
import { TextField, Tooltip, InputAdornment } from '@material-ui/core'

const AppInput = (props) => {
    return (
        <TextField
        autoComplete="off"
        {...props}
        error={!!props.error}
        style={{backgroundColor:'#fff', borderRadius:'4px'}}
        InputProps={{
            endAdornment: 
            props.error &&
            <InputAdornment
            position="end">
                <Tooltip placement="top-end" title={props.error}>
                    <ReportProblemOutlined className="text-danger"/>
                </Tooltip>
            </InputAdornment>,
        }}
        fullWidth
        variant="outlined" 
        size="small" />
    )
}

export default AppInput;