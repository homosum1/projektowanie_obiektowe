import { Dispatch, SetStateAction, useState } from "react";
import { SelectedItem } from "../../App";

import "./Payment.scss";

interface PaymentProps {
    selectedItems: SelectedItem[];
    setSelectedItems: Dispatch<SetStateAction<SelectedItem[]>>
}

export const Payment = (props: PaymentProps) => {

    const [messages, setMessages] = useState<string[]>([]);
    
    const totalCost = props.selectedItems.reduce((total, item) => {
        const itemTotal = item.item.Price * item.Quantity;
        return total + itemTotal;
    }, 0);
    
    const handlePurchase = () => {

        let messages: string[] = [];

        props.selectedItems.forEach(async (selectedItem) => {
            const response = await fetch('http://localhost:3000/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemID: selectedItem.item.ID, quantity: selectedItem.Quantity }),
            });

            const data = await response.text();

            messages.push(data);

            props.setSelectedItems([]);
        });

        setMessages(messages);
    }

    return (
        <div className="Payment">
            <span>Podgląd koszyka</span>

                <ul>
                { 
                    props.selectedItems.map((item, index) => (
                        <li key={index}>
                            <span>{item.item.Name} - </span>
                            <span>{item.item.Price.toFixed(2)}zł x {item.Quantity} = </span>
                            <span>{(item.item.Price * item.Quantity).toFixed(2)}zł</span>
                        </li>
                    ))
                }
            </ul>
            <h4>Koszt całkowity: {totalCost.toFixed(2)}zł</h4>
            
            <div onClick={handlePurchase} className="Payment__buy-button">
                Wykonaj zakup
            </div>
            { 
                messages.map((el, index) => (
                    <div key={index} className="Payment__message">{el}</div>
                ))
            
            }
        </div>
    )
}