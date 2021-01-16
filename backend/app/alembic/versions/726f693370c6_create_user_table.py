"""create user table

Revision ID: 726f693370c6
Revises: 
Create Date: 2021-01-14 19:13:38.354021

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '726f693370c6'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True, index=True),
        sa.Column('spotify_id', sa.String, unique=True, index=True),
        sa.Column('is_active', sa.Boolean, default=True),
        sa.Column('name', sa.String(255)),
        sa.Column('image_url', sa.String),
        sa.Column('refresh_token', sa.String),
        sa.Column('access_token', sa.String),
        sa.Column('token_expires', sa.Integer)
    )


def downgrade():
    op.drop_table('users')
