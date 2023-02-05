import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';

function RefreshButton() {

    const refreshPage = () => window.location.reload(false);

    return (
        <div className="Refresh">
            <Button color="primary" variant="contained" aria-label="add" onClick={refreshPage}>
                <RefreshIcon />
                Odśwież
            </Button>
        </div>
    );
}

export default RefreshButton;