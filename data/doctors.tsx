export interface Doctor {
  id: string
  name: string
  profilePhoto?: string
  specialization: string
  qualification: string
  designation: string
  experience: string
  availability: boolean
  consultationType: string
  rating?: number
  department?: string
  email?: string
  phone?: string
  registrationNo?: string
}

let doctors: Doctor[] = [
  {
    id: "DOC-1001",
    name: "Dr. Sarah Johnson",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    specialization: "Cardiology",
    qualification: "MD, Cardiology",
    designation: "Senior Consultant",
    experience: "15",
    availability: true,
    consultationType: "both",
    rating: 4.8,
    department: "Cardiology",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    registrationNo: "MCI-12345",
  },
  {
    id: "DOC-1002",
    name: "Dr. Michael Chen",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    specialization: "Neurology",
    qualification: "MD, Neurology",
    designation: "Consultant",
    experience: "8",
    availability: true,
    consultationType: "online",
    rating: 4.5,
    department: "Neurology",
    email: "michael.chen@example.com",
    phone: "+1 (555) 234-5678",
    registrationNo: "MCI-67890",
  },
  {
    id: "DOC-1003",
    name: "Dr. Emily Taylor",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    specialization: "Pediatrics",
    qualification: "MD, Pediatrics",
    designation: "Junior Consultant",
    experience: "5",
    availability: false,
    consultationType: "offline",
    rating: 4.7,
    department: "Pediatrics",
    email: "emily.taylor@example.com",
    phone: "+1 (555) 345-6789",
    registrationNo: "MCI-11223",
  },
  {
    id: "DOC-1004",
    name: "Dr. James Wilson",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    specialization: "Orthopedics",
    qualification: "MS, Orthopedics",
    designation: "Senior Consultant",
    experience: "20",
    availability: true,
    consultationType: "both",
    rating: 4.9,
    department: "Orthopedics",
    email: "james.wilson@example.com",
    phone: "+1 (555) 456-7890",
    registrationNo: "MCI-44556",
  },
  {
    id: "DOC-1005",
    name: "Dr. Olivia Martinez",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    specialization: "Dermatology",
    qualification: "MD, Dermatology",
    designation: "Consultant",
    experience: "7",
    availability: true,
    consultationType: "online",
    rating: 4.6,
    department: "Dermatology",
    email: "olivia.martinez@example.com",
    phone: "+1 (555) 567-8901",
    registrationNo: "MCI-77889",
  },
]

export const getDoctorById = (id: string): Doctor | undefined => {
  return doctors.find((doctor) => doctor.id === id)
}

export const getAllDepartments = (): string[] => {
  return [...new Set(doctors.map((doctor) => doctor.department || "General"))]
}

export const getAllSpecializations = (): string[] => {
  return [...new Set(doctors.map((doctor) => doctor.specialization))]
}

export const getActiveDoctors = (): Doctor[] => {
  return doctors.filter((doctor) => doctor.availability)
}

export const getDoctorsByDepartment = (department: string): Doctor[] => {
  return doctors.filter((doctor) => doctor.department === department)
}

export const formatDoctorInfo = (doctor: Doctor): string => {
  return `${doctor.name} (${doctor.qualification})`
}

export const getDoctors = (): Doctor[] => {
  return doctors
}

export const addDoctor = (doctor: Omit<Doctor, "id" | "rating">): Doctor => {
  const newDoctor: Doctor = {
    id: `DOC-${Math.random().toString(36).substr(2, 9)}`,
    rating: 0,
    ...doctor,
  }
  doctors = [...doctors, newDoctor]
  return newDoctor
}

export const updateDoctor = (id: string, updates: Partial<Doctor>): Doctor | undefined => {
  doctors = doctors.map((doctor) => (doctor.id === id ? { ...doctor, ...updates } : doctor))
  return getDoctorById(id)
}

export const deleteDoctor = (id: string): void => {
  doctors = doctors.filter((doctor) => doctor.id !== id)
}
