"""add refresh token column

Revision ID: ae8603b30641
Revises: e20bb74188d7
Create Date: 2021-01-14 21:18:25.621915

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ae8603b30641'
down_revision = 'e20bb74188d7'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        'users', sa.Column('user_refresh_token', sa.String(255), index=True))


def downgrade():
    op.drop_column('users', 'user_refresh_token')
