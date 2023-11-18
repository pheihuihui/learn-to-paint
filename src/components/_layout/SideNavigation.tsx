// REF: https://github.com/abhijithvijayan/react-minimal-side-navigation/blob/main/source/side-nav.tsx

import React, { FC, useEffect, useState } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "../Icon"

export type NavItemProps = {
    title: string
    itemId: string
    elemBefore?: FC<unknown>
    subNav?: NavItemProps[]
}

export type SideNavProps = {
    items: NavItemProps[]
    activeItemId: string
    onSelect?: ({ itemId }: { itemId: string }) => void
}

export const SideNavigation: FC<SideNavProps> = (props) => {
    const [activeSubNav, setActiveSubNav] = useState({
        expanded: true,
        selectedId: props.activeItemId,
    })

    useEffect(() => {
        setActiveSubNav((originalSubNav) => ({
            expanded: originalSubNav.expanded,
            selectedId: props.activeItemId,
        }))
    }, [props.activeItemId])

    function handleClick(itemId: string): void {
        props.onSelect?.({ itemId })
    }

    function handleSubNavExpand(item: NavItemProps): void {
        if (activeSubNav.expanded) {
            const currentItemOrSubNavItemIsOpen: boolean =
                item.itemId == activeSubNav.selectedId ||
                (item.subNav && item.subNav.some((_subNavItem) => _subNavItem.itemId == activeSubNav.selectedId)) ||
                false

            setActiveSubNav({
                expanded: item.subNav && item.subNav.length > 0 ? !currentItemOrSubNavItemIsOpen : false,
                selectedId: item.itemId,
            })
        } else {
            setActiveSubNav({
                expanded: !!(item.subNav && item.subNav.length > 0),
                selectedId: item.itemId,
            })
        }
    }

    return (
        <>
            {props.items.length > 0 && (
                <nav role="navigation" aria-label="side-navigation" className="side-navigation-panel">
                    {props.items.map((item) => {
                        const ElemBefore = item.elemBefore
                        const isItemSelected = item.itemId == activeSubNav.selectedId
                        const isActiveTab =
                            activeSubNav.expanded &&
                            (isItemSelected ||
                                (item.subNav && item.subNav.some((_subNavItem: NavItemProps) => _subNavItem.itemId == activeSubNav.selectedId)) ||
                                false)

                        return (
                            <ul key={item.itemId} className="">
                                <li className="">
                                    <div
                                        onClick={(): void => {
                                            handleSubNavExpand(item)
                                            handleClick(item.itemId)
                                        }}
                                        className=""
                                    >
                                        <span className="">
                                            {/** Prefix Icon Component */}
                                            {ElemBefore && <ElemBefore />}

                                            <span className="">{item.title}</span>
                                        </span>

                                        {item.subNav && item.subNav.length > 0 && (isActiveTab ? <ChevronUpIcon /> : <ChevronDownIcon />)}
                                    </div>
                                </li>

                                {item.subNav && item.subNav.length > 0 && isActiveTab && (
                                    <ul className="side-navigation-panel-select-inner">
                                        {item.subNav.map((subNavItem) => {
                                            const SubItemElemBefore = subNavItem.elemBefore

                                            return (
                                                <li key={subNavItem.itemId} className="side-navigation-panel-select-inner-wrap">
                                                    <div
                                                        onClick={() => {
                                                            setActiveSubNav({
                                                                ...activeSubNav,
                                                                selectedId: subNavItem.itemId,
                                                            })
                                                            handleClick(subNavItem.itemId)
                                                        }}
                                                        className=""
                                                    >
                                                        <span className="">
                                                            {/** Prefix Icon Component */}
                                                            {SubItemElemBefore && <SubItemElemBefore />}
                                                            <span className="">{subNavItem.title}</span>
                                                        </span>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                            </ul>
                        )
                    })}
                </nav>
            )}
        </>
    )
}
