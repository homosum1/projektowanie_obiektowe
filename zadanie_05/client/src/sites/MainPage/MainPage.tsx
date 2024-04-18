import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./mainPage.scss";

import { Item, SelectedItem } from "../../App";

interface MainPageProps {
    items: Item[];
    selectedItems: SelectedItem[];
    setSelectedItems: Dispatch<SetStateAction<SelectedItem[]>>
}

export const MainPage = (props: MainPageProps) => {

   

    const addItem = (ID: number) => {
        let itemExists = false;
    
        const newSelectedItems = props.selectedItems.map(element => {
            if (element.item.ID === ID) {
                itemExists = true;
    
                if (element.item.Quantity > element.Quantity) {
                    return { ...element, Quantity: element.Quantity + 1 };
                }
            }
            return element;
        });
    
        if (!itemExists) {
            const addedItem = props.items.find(el => el.ID === ID);
            if (addedItem) {
                const newItem: SelectedItem = { Quantity: 1, item: addedItem };
                newSelectedItems.push(newItem);
            }
        }
    
        props.setSelectedItems(newSelectedItems);
    };

    const removeItem = (ID: number) => {

        const newSelectedItems = props.selectedItems.reduce((acc, element) => {

            if (element.item.ID === ID) {
                const newQuantity = element.Quantity - 1;

                if (newQuantity > 0) {
                    acc.push({ ...element, Quantity: newQuantity });
                }
            } else {
                acc.push(element);
            }
            return acc;
        }, [] as SelectedItem[]);
    
        props.setSelectedItems(newSelectedItems);
    };
    

    return (
        <div className="mainPage ">
            <div>
                <h2>Dostępne przedmioty:</h2>
                    {
                        props.items.map(item => (
                            <div className="mainPage__item" key={item.ID}>
                                <div className="mainPage__item__left">
                                    <span>{item.Icon} </span>
                                    <span>{item.Name} </span>
                                    <span>Price: ${item.Price.toFixed(2)}</span>
                                    <span>Quantity: {item.Quantity}</span>
                                </div>
                                <div className="mainPage__item__right">
                                    <span onClick={() => addItem(item.ID)}>+</span>
                                    <span onClick={() => removeItem(item.ID)}>-</span>
                                </div>
                            </div>
                        ))
                    }


                    {
                        <div className="data">
                            <div><span>Podgląd stanu:</span></div>
                            <span>{JSON.stringify(props.selectedItems)}</span>
                        </div>
                    }
            </div>
        </div>
    )
}