import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
    items: { label: string; value: string }[],
    value: string | null,
    onChange: (value: string) => void
}

export const Dropdown = ({items, value, onChange}: Props) => {
    const currentLabel = items.find(i => i.value === value)?.label || 'Select'
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>{currentLabel}</DropdownMenuTrigger>
            <DropdownMenuContent>
                {/*<DropdownMenuLabel>Available sizes</DropdownMenuLabel>*/}
                {items.map(i => <DropdownMenuItem key={i.value}
                                                  onClick={() => onChange(i.value)}>{i.label}</DropdownMenuItem>)}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}