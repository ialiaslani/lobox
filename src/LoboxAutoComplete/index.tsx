import type React from "react"
import { useEffect, useRef, useState } from "react"
import './index.scss'

type TItem = {
 label: string,
 value: string,
 icon?: string
}

type TLoboxAutoCompleteProps = {
        items: Array<TItem>,
        inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

const useMounted = (fn: React.EffectCallback) => useEffect(fn, [])

const LoboxAutoComplete: React.FC<TLoboxAutoCompleteProps> = ({
        items,
        inputProps = {}
}) => {
        const [showOptions, setShowOptions] = useState(false)
        const [filteredItems, setFilteredItems] = useState(items)
        const [inputValue, setInputValue] = useState("")
        const [selected, setSelected] = useState(null as unknown as TItem)
        const inputWrapperRef = useRef(null as unknown as HTMLInputElement)

       useMounted(() => {
                const handleClickOutside = (e: MouseEvent) => {
                        if(inputWrapperRef.current && !inputWrapperRef.current.contains(e.target as Node)) {

                              const selectedValue = items.find(item =>
                                     item.label.toLowerCase() === (inputWrapperRef.current.childNodes[0] as unknown as HTMLInputElement)?.value?.toLocaleLowerCase()
                              )

                              if(selectedValue?.label) {
                                      setInputValue(selectedValue.label);
                                      setSelected(selectedValue)
                                } else {
                                        setInputValue(selected?.label ?? '')
                                        setSelected(pre => pre)
                                        setFilteredItems(items)
                                        setSelected(null as unknown as TItem)
                              }
                              setShowOptions(false)
                        }

                }

                document.addEventListener("mousedown", handleClickOutside)
                return () => {
                        document.removeEventListener("mousedown", handleClickOutside)
                }
       })

       const onSelectItem = (item: TItem) => {
               setInputValue(item.label);
               setSelected(item)
               setShowOptions(false)
       }

        return (
              <div ref={inputWrapperRef} className="l-auto-complete">
                <input 
                        {...inputProps}
                        type="text" 
                        onFocus={(e) => {setShowOptions(true); inputProps?.onFocus?.(e)}}
                        onChange={(e) => {
                              setInputValue(e.target.value)
                              setFilteredItems(
                                     items.filter(item =>
                                              item.label.toLowerCase().includes(e.target.value.toLowerCase())
                                     )
                              )
                              inputProps?.onChange?.(e)
                        }}
                        value={inputValue}
                />
                <span className={`arrow ${showOptions ? 'open' : ''}`}>{'>'}</span>
                {showOptions && <ul className="items">
                                {filteredItems.map((item) => (
                                        <li 
                                                key={item.value} 
                                                className={"item" + (selected?.value === item.value ? " checked" : "")} 
                                                onClick={() => {onSelectItem(item)}}
                                        >
                                                {item.label}
                                                {selected?.value === item.value && <span>✔️</span>}
                                        </li>
                                ))}
                       </ul>}
              </div>
        )
}


export default LoboxAutoComplete