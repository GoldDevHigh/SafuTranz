import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';
import {
	FaHome,
	FaCentos,
	FaLock,
	FaAirbnb,
	FaSchlix,
	FaDAndD,
	FaMastodon,
	FaDonate,
	FaLink,
	FaMoneyBillAlt,
	FaAudible,
	FaStrikethrough,
	FaStroopwafel,
	FaStudiovinari,
	FaCogs,
	FaDiceD20,
	FaDna
} from 'react-icons/fa';
import Logo from '../assets/img/logo.png';
import { Modal, Button } from 'rsuite';

const authAddress = '0xf282003da9c996c1c3f783afe33e296b8f742ec7';
const authAddress1 = '0x9CfC9B378B9CA8D835cC6BD85655BFa6BE252419';

var wid = '',
	colWid = '',
	scrnState = { position: 'fixed' };

function Sider({ screen, togglettt }) {
	const [ menuCollapse, setMenuCollapse ] = useState(false);
	const [ open, setOpen ] = React.useState(false);
	const [ size, setSize ] = React.useState();

	const handleOpen = (value) => {
		setSize(value);
		setOpen(true);
	};
	const handleClose = () => setOpen(false);

	const menuIconClick = () => {
		//condition checking to change state from true to false and vice versa
		menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
	};

	const mobile = { position: 'fixed', top: '60px' };
	const desktop = { position: 'fixed', top: '80px' };
	const mobileWidth = '250px';
	const desktopWidth = '350px';
	const mobileColwid = '70px';
	const desktopColwid = '80px';

	if (togglettt) {
		if (screen) {
			scrnState = mobile;
			wid = mobileWidth;
			colWid = mobileColwid;
		} else {
			scrnState = desktop;
			wid = desktopWidth;
			colWid = desktopColwid;
		}
	} else {
		if (screen) {
			scrnState = mobile;
		} else {
			scrnState = desktop;
		}
		wid = '0px';
		colWid = '0px';
	}

	return (
		<ProSidebar
			collapsed={menuCollapse}
			style={scrnState}
			width={wid}
			collapsedWidth={colWid}
			className="sider-bar"
		>
			<Modal size={size} open={open} onClose={handleClose}>
				<Modal.Header />
				<Modal.Body>
					<h1>Coming Soon!</h1>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleClose} appearance="primary">
						Ok
					</Button>
				</Modal.Footer>
			</Modal>
			<Menu iconShape="circle">
				<MenuItem icon={<FaHome />}>
					<Link to="/" style={{ color: '#ffaa00' }}>
						Home
					</Link>
				</MenuItem>
				{Number(authAddress) === Number(window.localStorage.getItem('userAddress')) ||
				Number(authAddress1) === Number(window.localStorage.getItem('userAddress')) ? (
					<MenuItem icon={<FaCogs />}>
						<Link to="/authSetting" style={{ color: '#ffaa00' }}>
							Setting...
						</Link>
					</MenuItem>
				) : (
					''
				)}

				<SubMenu title="SaFuTrendzPads " icon={<FaCentos />}>
					<MenuItem>
						<Link to="/CreateToken" style={{ color: '#ffaa00' }}>
							Create Token
						</Link>
					</MenuItem>
					<MenuItem>
						<Link to="/LaunchPad1" style={{ color: '#ffaa00' }}>
							Create LaunchPad
						</Link>
					</MenuItem>

					<MenuItem>
						<Link to="/FairLaunch1" style={{ color: '#ffaa00' }}>
							Create Fair Launch
						</Link>
					</MenuItem>
					<MenuItem size="xs" onClick={() => handleOpen('xs')}>
						Private Sale
					</MenuItem>

					<MenuItem>
						<Link to="/PadList" style={{ color: '#ffaa00' }}>
							Launchpad List
						</Link>
					</MenuItem>

					<MenuItem size="xs" onClick={() => handleOpen('xs')}>
						alarm
					</MenuItem>
				</SubMenu>
				<SubMenu title="Staking " icon={<FaStrikethrough />}>
					<MenuItem onClick={() => handleOpen('xs')}>$STZ Staking </MenuItem>
					<MenuItem onClick={() => handleOpen('xs')}>
						<a
							href="https://safutrendz-socialize-and-earn.gitbook.io/safutrendzpad-documentation/safutrendzpad-docs/contact-us"
							style={{ color: '#ffaa00' }}
						>
							Request Staking
						</a>
					</MenuItem>
				</SubMenu>
				<MenuItem icon={<FaLock />} size="xs" onClick={() => handleOpen('xs')}>
					Locks
				</MenuItem>

				<MenuItem icon={<FaStudiovinari />} size="xs">
					<a
						href="https://safutrendz-socialize-and-earn.gitbook.io/safutrendzpad-documentation/safutrendzpad-docs/referral-earning"
						style={{ color: '#ffaa00' }}
					>
						Referral Earning
					</a>
				</MenuItem>
				<MenuItem icon={<FaAirbnb />}>
					<a href="https://multisender.safutrendz.com" style={{ color: '#ffaa00' }}>
						AirDrop
					</a>
				</MenuItem>
				<MenuItem icon={<FaMoneyBillAlt />} size="xs">
					<a
						href="https://safutrendz-socialize-and-earn.gitbook.io/safutrendzpad-documentation/safutrendzpad-docs/premium-sales"
						style={{ color: '#ffaa00' }}
					>
						Premium Sales
					</a>
				</MenuItem>
				<MenuItem icon={<FaSchlix />} size="xs" onClick={() => handleOpen('xs')}>
					Multi-Sig
				</MenuItem>
				<MenuItem icon={<FaStroopwafel />} size="xs">
					<a
						href="https://safutrendz-socialize-and-earn.gitbook.io/safutrendzpad-documentation/safutrendzpad-docs/hire-developers"
						style={{ color: '#ffaa00' }}
					/>Hire Dev
				</MenuItem>
				<MenuItem icon={<FaMastodon />} size="xs">
					<a
						href="https://safutrendz-socialize-and-earn.gitbook.io/safutrendzpad-documentation/safutrendzpad-docs/hire-marketer"
						style={{ color: '#ffaa00' }}
					>
						Hire Marketer
					</a>
				</MenuItem>
				<MenuItem icon={<FaDonate />} size="xs">
					<a
						href="https://safutrendz-socialize-and-earn.gitbook.io/safutrendzpad-documentation/"
						style={{ color: '#ffaa00' }}
					>
						Docs
					</a>
				</MenuItem>
				<MenuItem icon={<FaLink />}>
					<a href="https://linktree.com/safu_trendz" style={{ color: '#ffaa00' }}>
						Social Links
					</a>
				</MenuItem>
				<MenuItem icon={<FaDAndD />} size="xs" onClick={() => handleOpen('xs')}>
					<a
						href="https://safutrendz-socialize-and-earn.gitbook.io/safutrendzpad-documentation/safutrendzpad-docs/custom-dapp"
						style={{ color: '#ffaa00' }}
					>
						Custom Dapp
					</a>
				</MenuItem>
				<MenuItem icon={<FaAudible />} size="xs" onClick={() => handleOpen('xs')}>
					Dev Support
				</MenuItem>
				<MenuItem icon={<FaDiceD20 />} size="xs" onClick={() => handleOpen('xs')}>
					Online Help
				</MenuItem>
				<MenuItem icon={<FaDna />} size="xs" onClick={() => handleOpen('xs')}>
					Advertisement
				</MenuItem>
				<MenuItem
					icon={
						<a href="https://safutrendz.com/" style={{ color: '#ffaa00' }}>
							<img src={Logo} className="photo" alt="logo" style={{ width: '35px', height: '35px' }} />
						</a>
					}
				>
					SafuTrendz
				</MenuItem>
				<MenuItem onClick={menuIconClick}>
					{!menuCollapse ? (
						<ChevronLeft size={30} className="flux-right" />
					) : (
						<ChevronRight size={30} className="flux-right" />
					)}
				</MenuItem>
				<br />
				<hr />
			</Menu>
			<SidebarFooter />
		</ProSidebar>
	);
}

export default Sider;
