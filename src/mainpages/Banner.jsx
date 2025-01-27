import {
    Command,
    
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    
} from "@/components/ui/command"
import banner from '../assets/banner.jpg'
const Banner = () => {
    return (
        <div
            className="relative flex items-center justify-center h-screen bg-cover bg-center text-white mt-2"
            style={{
                backgroundImage: `url('${banner}')`, // Replace with your image URL
            }}
        >
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-black/50 rounded-lg"></div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl text-center space-y-6">
                {/* Heading */}
                <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                    Welcome to Your delivery Partner
                </h1>
                <p className="text-lg md:text-xl text-gray-200">
                    Type for anything you need.
                </p>

                {/* Search Bar */}
                <Command className="w-full  max-w-lg mx-auto bg-white/65 rounded-lg shadow-md">
                    <CommandInput
                        placeholder="What are you looking for..."
                        className="border-none focus:ring-0"
                    />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            <CommandItem>Add a parcel</CommandItem>
                            <CommandItem>PickUp request</CommandItem>
                            <CommandItem>Estimated Price</CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Settings">
                            <CommandItem>Profile</CommandItem>
                            <CommandItem>Billing</CommandItem>
                            <CommandItem>Settings</CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </div>
        </div>
    );
};

export default Banner;
