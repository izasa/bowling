import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function Banner() {
    return (
        <div className="Banner">
            <AppBar position="static">
                <Toolbar disableGutters>
                    <EmojiEventsIcon/>
                    <Typography
                        variant="h6"
                    >
                        Bowling 
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Banner;