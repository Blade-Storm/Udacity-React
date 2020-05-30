
import React, {Fragment} from 'react';
import Typography from '@material-ui/core/Typography';

/**
 * Error component that shows a "404" page specifically for when a user tries to access a question URL that doesnt exist
 */
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