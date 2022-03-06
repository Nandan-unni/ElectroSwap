from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    """User Manager"""

    def create_user(self, username, email, first_name, password=None):
        """Create user"""
        if not email:
            raise ValueError("Users must provide an email id")
        if not first_name:
            raise ValueError("Users must provide a first name.")
        if not username:
            raise ValueError("Users must provide a username")
        user = self.model(
            email=self.normalize_email(email),
            full_name=first_name.title(),
            username=username,
        )
        user.set_password(password)
        user.save(using=self._db)
        print("User created successfully.")
        return user

    def create_superuser(self, username, email, full_name, password=None):
        """Create user and give Superuser privilages"""
        user = self.create_user(
            email=email, full_name=full_name, username=username, password=password
        )
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        print("Superuser privilages activated.")
        user.save(using=self._db)
        return user
