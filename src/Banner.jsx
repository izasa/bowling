import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function Banner() {
    return (
        <div className="Banner">
            <AppBar position="static">
                <Toolbar disableGutters>
                    <EmojiEventsIcon style={{width: '50px'}}/>
                    <Typography
                        variant="h6"
                    >
                        System raportowania wyników gry w kręgle Bowling 
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Banner;