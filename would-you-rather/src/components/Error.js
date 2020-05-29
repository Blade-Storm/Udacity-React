
import React, {Fragment} from 'react';
import Typography from '@material-ui/core/Typography';

const Error = () => (
    <Fragment>
        <Typography variant="h3">
            404
        </Typography>
        <Typography variant="h5">
            The question you are looking for does not exist
        </Typography>
    </Fragment>
)

export default Error;