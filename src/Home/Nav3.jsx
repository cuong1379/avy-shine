import TweenOne from "rc-tween-one";
import { Menu } from "antd";
import { getChildrenToRender } from "./utils";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const { Item, SubMenu } = Menu;
const token = localStorage.getItem("avy-shine-token");

const Header3 = (props) => {
  let history = useHistory();

  const [phoneOpen, setPhoneOpen] = useState(undefined);

  const phoneClick = () => {
    setPhoneOpen(!phoneOpen);
  };

  const handleClick = () => {
    history.push("/");
  };

  const { dataSource, isMobile } = props;

  const navData = dataSource.Menu.children;
  const navChildren = navData.map((item) => {
    const { children: a, subItem, ...itemProps } = item;

    if (subItem) {
      return (
        <SubMenu
          key={item.name}
          {...itemProps}
          title={
            <div {...a} className={`header3-item-block ${a.className}`.trim()}>
              {a.children.map(getChildrenToRender)}
            </div>
          }
          popupClassName="header3-item-child"
        >
          {subItem.map(($item, ii) => {
            const { children: childItem } = $item;
            const child = childItem.href ? (
              <a {...childItem}>
                {childItem.children.map(getChildrenToRender)}
              </a>
            ) : (
              <div {...childItem}>
                {childItem.children.map(getChildrenToRender)}
              </div>
            );
            return (
              <Item key={$item.name || ii.toString()} {...$item}>
                {child}
              </Item>
            );
          })}
        </SubMenu>
      );
    }
    return (
      <Item key={item.name} {...itemProps}>
        <a {...a} className={`header3-item-block ${a.className}`.trim()}>
          {a.children.map(getChildrenToRender)}
        </a>
      </Item>
    );
  });
  const moment = phoneOpen === undefined ? 300 : null;
  return (
    <TweenOne
      component="header"
      animation={{ opacity: 0, type: "from" }}
      {...dataSource.wrapper}
      {...props}
    >
      <div
        {...dataSource.page}
        className={`${dataSource.page.className}${phoneOpen ? " open" : ""}`}
      >
        <TweenOne
          animation={{ x: -30, type: "from", ease: "easeOutQuad" }}
          {...dataSource.logo}
        >
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={handleClick}
          >
            <img
              width="100%"
              src={dataSource.logo.children}
              alt="img"
              style={{ width: "40px", height: "40px", marginRight: "15px" }}
            />
            <div
              style={{
                fontSize: "20",
                fontWeight: "500",
                color: "#C5C5C5",
              }}
            >
              AVY SHINE
            </div>
          </div>
        </TweenOne>
        {isMobile && (
          <div
            {...dataSource.mobileMenu}
            onClick={() => {
              phoneClick();
            }}
          >
            <em />
            <em />
            <em />
          </div>
        )}
        <TweenOne
          {...dataSource.Menu}
          animation={
            isMobile
              ? {
                  x: 0,
                  height: 0,
                  duration: 300,
                  onComplete: (e) => {
                    if (phoneOpen) {
                      e.target.style.height = "auto";
                    }
                  },
                  ease: "easeInOutQuad",
                }
              : null
          }
          moment={moment}
          reverse={!!phoneOpen}
        >
          <Menu
            mode={isMobile ? "inline" : "horizontal"}
            defaultSelectedKeys={["sub0"]}
            theme="light"
          >
            {navChildren}
          </Menu>
          {token ? (
            <div
              onClick={() => history.push("/login")}
              style={{
                marginLeft: "30px",
                marginTop: "10px",
              }}
            >
              Đăng xuất
            </div>
          ) : (
            <div
              onClick={() => history.push("/login")}
              style={{
                marginLeft: "30px",
                marginTop: "10px",
              }}
            >
              Đăng nhập
            </div>
          )}
        </TweenOne>
      </div>
    </TweenOne>
  );
};

export default Header3;
