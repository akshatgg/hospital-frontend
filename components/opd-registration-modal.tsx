"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface OpdRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function OpdRegistrationModal({ isOpen, onClose, onSubmit }: OpdRegistrationModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<Date>()

  const departments = [
    { id: 1, name: "Cardiology" },
    { id: 2, name: "Neurology" },
    { id: 3, name: "Orthopedics" },
    { id: 4, name: "Pediatrics" },
    { id: 5, name: "Dermatology" },
    { id: 6, name: "Ophthalmology" },
    { id: 7, name: "ENT" },
    { id: 8, name: "General Medicine" },
  ]

  const doctors = [
    { id: 1, name: "Dr. John Smith", department: 1 },
    { id: 2, name: "Dr. Sarah Johnson", department: 1 },
    { id: 3, name: "Dr. Michael Brown", department: 2 },
    { id: 4, name: "Dr. Emily Davis", department: 3 },
    { id: 5, name: "Dr. Robert Wilson", department: 4 },
    { id: 6, name: "Dr. Jennifer Lee", department: 5 },
    { id: 7, name: "Dr. William Taylor", department: 6 },
    { id: 8, name: "Dr. Elizabeth Clark", department: 7 },
    { id: 9, name: "Dr. David Miller", department: 8 },
  ]

  const [selectedDepartment, setSelectedDepartment] = useState<string>("")
  const [filteredDoctors, setFilteredDoctors] = useState(doctors)

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value)
    const deptId = departments.find((dept) => dept.name === value)?.id
    setFilteredDoctors(doctors.filter((doctor) => doctor.department === deptId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Generate a random token number
    const tokenNumber = Math.floor(1000 + Math.random() * 9000)

    // Simulate API call
    setTimeout(() => {
      const formData = new FormData(e.target as HTMLFormElement)
      const data = Object.fromEntries(formData.entries())

      onSubmit({
        ...data,
        tokenNumber,
        registrationDate: date || new Date(),
        status: "Waiting",
      })

      setIsLoading(false)
      onClose()
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">New OPD Registration</DialogTitle>
          <DialogDescription>
            Register a new outpatient for consultation. A token number will be automatically generated.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="patientName" className="text-gray-700">
                Patient Name
              </Label>
              <Input
                id="patientName"
                name="patientName"
                placeholder="Enter full name"
                required
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber" className="text-gray-700">
                Contact Number
              </Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="Enter mobile number"
                required
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age" className="text-gray-700">
                Age
              </Label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="Enter age"
                required
                min="0"
                max="120"
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700">Gender</Label>
              <RadioGroup defaultValue="male" name="gender" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department" className="text-gray-700">
                Department
              </Label>
              <Select name="department" onValueChange={handleDepartmentChange} required>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Departments</SelectLabel>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.name}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor" className="text-gray-700">
                Consulting Doctor
              </Label>
              <Select name="doctor" disabled={!selectedDepartment} required>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder={selectedDepartment ? "Select doctor" : "Select department first"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Doctors</SelectLabel>
                    {filteredDoctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.name}>
                        {doctor.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date" className="text-gray-700">
                Appointment Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal border-gray-300",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              <input type="hidden" name="appointmentDate" value={date ? format(date, "yyyy-MM-dd") : ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-gray-700">
                Appointment Time
              </Label>
              <Select name="appointmentTime" required>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Morning</SelectLabel>
                    <SelectItem value="09:00">09:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectLabel>Afternoon</SelectLabel>
                    <SelectItem value="14:00">02:00 PM</SelectItem>
                    <SelectItem value="15:00">03:00 PM</SelectItem>
                    <SelectItem value="16:00">04:00 PM</SelectItem>
                    <SelectItem value="17:00">05:00 PM</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="symptoms" className="text-gray-700">
              Symptoms / Complaints
            </Label>
            <Textarea
              id="symptoms"
              name="symptoms"
              placeholder="Describe the symptoms or complaints"
              className="min-h-[100px] border-gray-300"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-teal-500 to-cyan-600" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Register & Generate Token"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
