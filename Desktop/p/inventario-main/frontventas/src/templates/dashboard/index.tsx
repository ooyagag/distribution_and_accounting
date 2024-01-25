import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';


import PersonIcon from '@mui/icons-material/Person';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

import { Link, useRouteMatch } from 'react-router-dom';
import { DashboardRoute } from "../../routes/route";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
//import StorageIcon from '@mui/icons-material/Storage';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export function Dashboard() {

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [openstore, setOpenstore] = React.useState(false);




    let { url } = useRouteMatch();


    const handleClickstore = () => {
        setOpenstore(!openstore);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List component="nav" aria-label="main mailbox folders">
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event: any) => handleListItemClick(event, 0)}
                        component={Link}
                        to={`${url}`}
                    >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>

                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event: any) => handleListItemClick(event, 1)}
                        component={Link}
                        to={`${url}/workers`}

                    >
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Workers" />
                    </ListItemButton>

                    <ListItemButton
                        onClick={handleClickstore}
                    >
                        <ListItemIcon>
                            <InventoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inventary" />
                        {openstore ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>


                    <Collapse in={openstore} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton
                                component={Link}
                                to={`${url}/stores`}
                                sx={{ pl: 4 }}
                                selected={selectedIndex === 3}
                                onClick={(event: any) => handleListItemClick(event, 3)}

                            >


                                <ListItemIcon>
                                    <StoreMallDirectoryIcon />
                                </ListItemIcon>
                                <ListItemText primary="Stores" />


                            </ListItemButton>


                            <ListItemButton
                                component={Link}
                                to={`${url}/products`}
                                sx={{ pl: 4 }}
                                selected={selectedIndex === 2}
                                onClick={(event: any) => handleListItemClick(event, 2)}

                            >


                                <ListItemIcon>
                                    <AddShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText primary="Products" />


                            </ListItemButton>


                            <ListItemButton
                                component={Link}
                                to={`${url}/orders`}
                                sx={{ pl: 4 }}
                                selected={selectedIndex === 4}
                                onClick={(event: any) => handleListItemClick(event, 4)}

                            >


                                <ListItemIcon>
                                    <FormatListBulletedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Orders" />


                            </ListItemButton>


                            <ListItemButton
                                component={Link}
                                to={`${url}/sales`}
                                sx={{ pl: 4 }}
                                selected={selectedIndex === 5}
                                onClick={(event: any) => handleListItemClick(event, 5)}

                            >


                                <ListItemIcon>
                                    <AttachMoneyIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sales" />


                            </ListItemButton>

                            {/*<ListItemButton
                                component={Link}
                                to={`${url}/stock`}
                                sx={{ pl: 4 }}
                                selected={selectedIndex === 4}
                                onClick={(event: any) => handleListItemClick(event, 4)}

                            >


                                <ListItemIcon>
                                    <StorageIcon />
                                </ListItemIcon>
                                <ListItemText primary="Stock" />


                            </ListItemButton>
                            */}

                        </List>
                    </Collapse>




                </List>

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <DashboardRoute />
            </Box>
        </Box>
    )
}

/*

<Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>


*/