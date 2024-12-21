export type DashboardStat = {
    title: string;
    subtitle: string;
    value: string;
    description: string;
};

export type UserAnalytics = {
    lineGraphData: number[];
    pieChartData: {labels: [], frequency: []}
}

export type SignInFormData = {
    email: string;
    password: string;
  
}

export type SignUpFormData = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
  }

export type User = {
    firstName: string;
    lastName: string;
    _id: string;
    email: string;
    phoneNumber: string;
    role: string;
    status: string;
    address?: string;
    profilePic?: string;
    isVerified?: boolean;
    createdAt?: string;

    
}

export type AuthResponse = {
    id: string;
    role: string;
    accessToken: string;
}